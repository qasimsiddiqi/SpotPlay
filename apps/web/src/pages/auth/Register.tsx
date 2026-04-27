import z from "zod";
import TextInput from "../../components/core-components/TextInput";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RadioButton from "../../components/core-components/RadioButton";
import Button from "../../components/core-components/Button";
import { useRegisterMutation } from "../../redux/api//services/authApi";
import { useNavigate } from "react-router-dom";

const registerSchema = z
  .object({
    firstName: z.string().min(2, "Name must be at least 2 characters long"),
    lastName: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    userName: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .trim()
      .regex(/^\S+$/, "Username cannot contain spaces"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
    role: z.string(),
    gender: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const genderOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

const roleOptions = [
  { label: "Player", value: "PLAYER" },
  { label: "Vendor (Arena Owner)", value: "VENDOR" },
];

const RegisterPage = () => {
  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userName: "",
      confirmPassword: "",
      role: "PLAYER",
      gender: "MALE",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Registration data:", data);
    const { confirmPassword, firstName, lastName, ...formData } = data; // Exclude confirmPassword from submission
    const submissionData = {
      ...formData,
      fullName: `${firstName} ${lastName}`,
    };
    const response = await registerUser(submissionData).unwrap();
    localStorage.setItem("token", response.accessToken);
    navigate("/dashboard");
  };

  return (
    <div className="">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">New on SpotPlay?</h1>
        <p className="text-gray-600 mt-2">Create your SpotPlay account</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextInput
          {...register("email")}
          label="Email"
          placeholder="enter your email address"
          type="email"
          error={errors.email?.message}
        />
        <div className="flex flex-row gap-5">
          <TextInput
            {...register("firstName")}
            label="First Name"
            placeholder="enter your first name"
            error={errors.firstName?.message}
          />
          <TextInput
            {...register("lastName")}
            label="Last Name"
            placeholder="enter your last name"
            error={errors.lastName?.message}
          />
        </div>
        <TextInput
          {...register("userName")}
          label="Username"
          placeholder="enter your username"
          error={errors.userName?.message}
        />
        <TextInput
          {...register("password")}
          label="Password"
          placeholder="enter your password"
          type="password"
          error={errors.password?.message}
        />
        <TextInput
          {...register("confirmPassword")}
          label="Confirm Password"
          placeholder="confirm your password"
          type="password"
          error={errors.confirmPassword?.message}
        />
        <div>
          <span className="block text-left text-sm font-medium text-gray-700 mb-1.5">
            Gender
          </span>
          <div className="flex flex-wrap gap-3" role="radiogroup">
            {genderOptions.map((option) => (
              <Controller
                key={option.value}
                name="gender"
                control={control}
                render={({ field }) => (
                  <RadioButton
                    {...field}
                    value={option.value}
                    label={option.label}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                  />
                )}
              />
            ))}
          </div>
        </div>
        <div>
          <span className="block text-left text-sm font-medium text-gray-700 mb-1.5">
            Who do you want to register as?
          </span>
          <div className="flex flex-wrap gap-3" role="radiogroup">
            {roleOptions.map((option) => (
              <Controller
                key={option.value}
                name="role"
                control={control}
                render={({ field }) => (
                  <RadioButton
                    {...field}
                    value={option.value}
                    label={option.label}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                  />
                )}
              />
            ))}
          </div>
        </div>
        <Button
          className="w-full"
          type="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
