"use client";
import "@uploadthing/react/styles.css";
import { RecipeRequest, RecipeValidator } from "@/lib/validators/recipe";
import { User } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { UploadButton } from "@uploadthing/react";
import Image from "next/image";
import { Textarea } from "./ui/Textarea";
import {
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Trash2,
  Users2,
} from "lucide-react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Slider } from "@/components/ui/Slider";
import { toast } from "@/hooks/use-toast";
import { categories } from "@/lib/categories";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import useCustomToast from "@/hooks/use-custom-toast";
interface Ingredient {
  name: string;
  unit: string;
  amount: number;
}

interface StepData {
  content: string;
}

interface CreateRecipeFormProps {
  user: Pick<User, "id" | "username">;
}

const stepperSteps = ["General", "Ingredients", "Instructions"];

const CreateRecipeForm: FC<CreateRecipeFormProps> = ({ user }) => {
  const [step, setStep] = useState<number>(0);
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [prepTime, setPrepTime] = useState<number>(5);
  const [peoplesAmt, setPeoplesAmt] = useState<number>(1);
  const { loginToast } = useCustomToast();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RecipeRequest>({
    resolver: zodResolver(RecipeValidator),
    defaultValues: {
      prepTime: 5,
      peoples: 1,
    },
  });

  const { mutate: createRecipe, isLoading } = useMutation({
    mutationFn: async ({
      category,
      image,
      ingredients,
      peoples,
      prepTime,
      steps,
      subcategory,
      title,
    }: RecipeRequest) => {
      const payload: RecipeRequest = {
        category,
        image,
        ingredients,
        peoples,
        prepTime,
        steps,
        subcategory,
        title,
      };
      const { data } = await axios.post(`/api/recipe/create`, payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }

        return toast({
          title: "There was a problem",
          description: "Something went wrong, please try again later",
          variant: "destructive",
        });
      }
    },
    onSuccess: (data) => {
      router.push(`/recipe/${data}`);
      return toast({
        description: "Your recipe has been created.",
      });
    },
  });

  const isStep1Valid =
    watch("title") && watch("category") && watch("subcategory");
  const onNextStep = () => {
    if (step === 0) {
      if (!isStep1Valid) {
        return;
      }
    } else if (step === 1) {
      const isIngredientsValid = ingredients.every(
        (ingredient) =>
          ingredient.name && (ingredient.unit === "ml" || ingredient.unit)
      );
      if (!isIngredientsValid) {
        return;
      }
    }

    if (step === 2) {
      const isStepsValid = steps.every((step) => step.content.trim() !== "");
      if (!isStepsValid) {
        return;
      }
    }

    setStep((prevStep) => prevStep + 1);
  };

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", amount: 0, unit: "" },
  ]);

  const [watchedIngredients, setWatchedIngredients] =
    useState<Ingredient[]>(ingredients);

  useEffect(() => {
    setValue("ingredients", watchedIngredients);
  }, [watchedIngredients, setValue]);

  const addIngredient = () => {
    setWatchedIngredients([
      ...watchedIngredients,
      { name: "", unit: "", amount: 0 },
    ]);
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = [...watchedIngredients];
    updatedIngredients.splice(index, 1);
    setWatchedIngredients(updatedIngredients);
  };

  const [steps, setSteps] = useState<StepData[]>([{ content: "" }]);
  const [watchedSteps, setWatchedSteps] = useState<StepData[]>(steps);

  useEffect(() => {
    setValue("steps", watchedSteps);
  }, [watchedSteps, setValue]);

  const addStep = () => {
    setWatchedSteps([...watchedSteps, { content: "" }]);
  };

  const removeStep = (index: number) => {
    const updatedSteps = [...watchedSteps];
    updatedSteps.splice(index, 1);
    setWatchedSteps(updatedSteps);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((e) => {
          createRecipe(e);
        })}
        className="flex flex-col w-full mb-10"
      >
        <div
          className={
            uploadedImage
              ? "recipe-img"
              : errors.image
              ? "recipe-img border border-red-600"
              : "recipe-img border border-black"
          }
        >
          {!uploadedImage ? (
            <>
              <div className="flex items-center justify-center flex-col gap-2">
                <ImagePlus
                  color={errors.image ? "red" : "black"}
                  className="w-16 h-16 sm:w-20 sm:h-20"
                />

                <UploadButton
                  // @ts-expect-error uploadthing bug
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res != undefined) {
                      setUploadedImage(res[0].fileUrl);
                      setValue("image", res[0].fileUrl);
                    }
                  }}
                />
                <p className="px-1 text-xs text-red-600">
                  {errors.image?.message}
                </p>
              </div>
            </>
          ) : (
            <Image
              src={uploadedImage}
              alt="recipe img"
              width={500}
              height={500}
              className="w-full h-full rounded-md"
            ></Image>
          )}
        </div>

        <div className="w-full flex  justify-center">
          <Stepper
            activeStep={step}
            alternativeLabel
            classes={{ root: "w-full sm:w-[55%] pt-4 text-primary lg:w-1/2" }}
          >
            {stepperSteps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        <div className="m-auto w-full sm:w-[400px] lg:w-[500px] xl:w-[750px] 2xl:w-[800px] flex flex-col gap-11 mt-4">
          {step == 0 && (
            <>
              {/* Title */}
              <div className="flex flex-col gap-2">
                <Label
                  className="text-xl lg:text-2xl font-medium font-secoundary"
                  htmlFor="title"
                >
                  Title
                </Label>
                <Input
                  placeholder="e.g grilled chicken"
                  id="title"
                  size={30}
                  {...register("title")}
                  className="w-full sm:w-[65%]"
                />
                {errors?.title && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="category"
                  className="text-xl lg:text-2xl font-medium font-secoundary"
                >
                  Category
                </Label>
                <select
                  id="category"
                  {...register("category")}
                  className="w-full sm:w-[65%] p-2 pr-4 border border-zinc-300 rounded-md"
                >
                  <option value="">Select a category</option>
                  {Object.keys(categories).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {errors.category && (
                  <p className="pl-3 text-xs text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Subcategory */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="subcategory"
                  className="text-xl lg:text-2xl font-medium font-secoundary"
                >
                  Subcategory
                </Label>
                <select
                  id="subcategory"
                  {...register("subcategory")}
                  className="w-full sm:w-[65%] p-2 pr-4 border border-zinc-300 rounded-md "
                >
                  <option value="" className="">
                    Select a subcategory
                  </option>
                  {categories[watch("category")]?.map((subcategory) => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
                {errors.subcategory && (
                  <p className="pl-3 text-xs text-red-600">
                    {errors.subcategory.message}
                  </p>
                )}
              </div>

              {/* Preparation time */}
              <div className="flex flex-col gap-2">
                <p className="text-xl lg:text-2xl font-medium font-secoundary">
                  Preparation time
                </p>
                <Slider
                  defaultValue={[prepTime]}
                  max={120}
                  min={5}
                  step={5}
                  onValueChange={(e) => {
                    setPrepTime(e[0]);
                    setValue("prepTime", prepTime);
                  }}
                  className="w-full sm:w-[65%]"
                />
                <p className="text-md mt-1">{prepTime} min</p>
              </div>

              {/* Number of people */}
              <div className="flex flex-col gap-2 mb-5">
                <p className="text-xl lg:text-2xl font-medium font-secoundary">
                  Number of people
                </p>
                <Slider
                  defaultValue={[peoplesAmt]}
                  max={12}
                  min={1}
                  step={1}
                  onValueChange={(e) => {
                    setPeoplesAmt(e[0]);
                    setValue("peoples", peoplesAmt);
                  }}
                  className="w-full sm:w-[65%]"
                />
                <div className="flex gap-1 items-center">
                  <p className="text-md mt-1">{peoplesAmt}</p>
                  <Users2 color="#000000" className="w-5 h-5 mt-0.5" />
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <div>
              <Label
                htmlFor="ingredients"
                className="text-xl lg:text-2xl font-medium font-secoundary mb-1"
              >
                Ingredients
              </Label>

              {/* List of ingredients */}
              <div className="flex flex-col gap-5">
                {watchedIngredients.map((ingredient, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <Input
                        placeholder="Ingredient name"
                        value={ingredient.name}
                        {...register(`ingredients.${index}.name`)}
                        onChange={(e) => {
                          const updatedIngredients = [...watchedIngredients];
                          updatedIngredients[index].name = e.target.value;
                          setIngredients(updatedIngredients);
                        }}
                        className="w-[50%] sm:w-[60%]"
                      />
                      <Input
                        type="number"
                        value={ingredient.amount}
                        {...register(`ingredients.${index}.amount`, {
                          valueAsNumber: true,
                          validate: (value) => {
                            return (
                              value > 0 || "Amount must be a positive number"
                            );
                          },
                        })}
                        onChange={(e) => {
                          const updatedIngredients = [...watchedIngredients];
                          updatedIngredients[index].amount = parseFloat(
                            e.target.value
                          );
                          setIngredients(updatedIngredients);
                        }}
                        className="w-1/5 p-2 border border-zinc-300 rounded-md"
                        placeholder="Amount"
                      />
                      <select
                        value={ingredient.unit}
                        {...register(`ingredients.${index}.unit`, {
                          required: "Ingredient unit is required",
                        })}
                        onChange={(e) => {
                          const updatedIngredients = [...watchedIngredients];
                          updatedIngredients[index].unit = e.target.value;
                          setIngredients(updatedIngredients);
                        }}
                        className="w-[30%]  p-2 pr-4 border border-zinc-300 rounded-md"
                      >
                        <option value="">Select unit</option>
                        <option value="ml">ml</option>
                        <option value="g">g</option>
                        <option value="pcs">pcs</option>
                        <option value="package">package</option>
                        <option value="teaspoon">teaspoon</option>
                      </select>
                      {index > 0 ? (
                        <Trash2
                          color="#000000"
                          className="cursor-pointer w-6 h-6"
                          onClick={() => removeIngredient(index)}
                        />
                      ) : (
                        <div className="w-6 h-6"></div>
                      )}
                    </div>
                    <p className="pl-3 text-xs text-red-600">
                      {ingredient.name.length < 3 ||
                        (ingredient.name.length > 60 &&
                          errors.ingredients?.[index]?.name?.message)}
                      {}
                    </p>
                  </div>
                ))}
              </div>

              {/* Button to add a new ingredient */}
              <Button
                variant="default"
                onClick={addIngredient}
                className="mt-5"
              >
                Add Ingredient
              </Button>
            </div>
          )}

          {step === 2 && (
            <div>
              {/* List of steps */}
              <div className="flex flex-col gap-5">
                {watchedSteps.map((stepData, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <p className="text-xl font-secoundary">Step {index + 1}</p>
                    <div className="flex items-center gap-1">
                      {/* Step Content */}
                      <Textarea
                        placeholder="Step content"
                        value={stepData.content}
                        {...register(`steps.${index}.content`, {
                          required: "Step content is required", // Add any other validation rules here
                        })}
                        onChange={(e) => {
                          const updatedSteps = [...watchedSteps];
                          updatedSteps[index].content = e.target.value;
                          setSteps(updatedSteps);
                        }}
                        className="w-full"
                      />
                      {index > 0 ? (
                        <Trash2
                          color="#000000"
                          className="cursor-pointer w-6 h-6"
                          onClick={() => removeStep(index)}
                        />
                      ) : (
                        <div className="w-6 h-6"></div>
                      )}
                    </div>
                    {/* Validation error message */}
                    <p className="pl-3 text-xs text-red-600">
                      {stepData.content.length < 10 ||
                        (stepData.content.length > 1200 &&
                          errors.steps?.[index]?.content?.message)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Button to add a new step */}
              <Button variant="default" onClick={addStep} className="mt-5">
                Add Step
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center mt-14">
          <div className="w-full sm:w-[400px] lg:w-[500px] xl:w-[750px] 2xl:w-[800px]">
            {step === 0 && (
              <div className="flex justify-end">
                <Button variant="rose" onClick={onNextStep}>
                  Next step <ChevronRight color="#000000" />
                </Button>
              </div>
            )}

            {step === 1 && (
              <div className="flex justify-between">
                <Button
                  variant="rose"
                  onClick={() => setStep((prevStep) => prevStep - 1)}
                >
                  <ChevronLeft color="#000000" /> Prev step
                </Button>
                <Button variant="rose" onClick={onNextStep}>
                  Next step <ChevronRight color="#000000" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="flex justify-between">
                <Button
                  variant="rose"
                  onClick={() => setStep((prevStep) => prevStep - 1)}
                >
                  <ChevronLeft color="#000000" /> Prev step
                </Button>

                <Button variant="rose">Finish</Button>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateRecipeForm;
