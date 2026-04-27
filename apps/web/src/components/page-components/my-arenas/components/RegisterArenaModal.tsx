import z from "zod";
import Modal from "../../../core-components/Modal";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../core-components/TextInput";
import Button from "../../../core-components/Button";
import DropDown from "../../../core-components/DropDown";
import { areaOptions } from "../../../../utils/sampleData";
import { useGetCurrentUserQuery } from "../../../../redux/api/services/authApi";
import { useRegisterArenaMutation } from "../../../../redux/api/services/arenaApi";
import TextArea from "../../../core-components/TextArea";

interface RegisterArenaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterArenaSchema = z.object({
  name: z.string().min(3, "Arena name must be at least 3 characters long"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  area: z.string().nonempty("Area is required"),
  descriptiion: z.string().optional(),
});

type RegisterArenaFormData = z.infer<typeof RegisterArenaSchema>;

const RegisterArenaModal = ({ isOpen, onClose }: RegisterArenaModalProps) => {
  const { data: user, isLoading } = useGetCurrentUserQuery();
  const [registerArena, { isLoading: isRegisteringArena }] =
    useRegisterArenaMutation();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterArenaFormData>({
    resolver: zodResolver(RegisterArenaSchema),
    defaultValues: {
      name: "",
      address: "",
      area: "",
      descriptiion: "",
    },
  });

  const onSubmit = async (data: RegisterArenaFormData) => {
    if (!user) return;

    const arenaData = {
      ...data,
      ownerId: user.id,
      status: "PENDING",
    };

    await registerArena(arenaData).unwrap();
    onClose();
    reset();
  };

  const onCancel = () => {
    onClose();
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal isOpen={isOpen} onClose={onClose}>
          <Modal.Header>Register A New Arena</Modal.Header>
          <Modal.Content>
            <div className="space-y-2">
              <div>
                <TextInput
                  label="Arena Name"
                  placeholder="Enter arena name"
                  error={errors.name?.message}
                  {...register("name")}
                />
              </div>
              <div>
                <TextInput
                  label="Address"
                  placeholder="Enter your arena's address"
                  error={errors.address?.message}
                  {...register("address")}
                />
              </div>
              <div>
                <Controller
                  name="area"
                  control={control}
                  render={({ field }) => (
                    <DropDown
                      name={field.name}
                      label="Area"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.area?.message}
                      options={areaOptions}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="descriptiion"
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      name={field.name}
                      label="Description"
                      placeHolder="Enter arena description"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </Modal.Content>
          <Modal.Footer>
            <Button
              onClick={onCancel}
              className="bg-white! text-black! border! border-gray-300!"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || isRegisteringArena}>
              Register
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
};

export default RegisterArenaModal;
