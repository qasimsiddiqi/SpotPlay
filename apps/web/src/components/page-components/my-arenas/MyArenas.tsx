import Button from "../../core-components/Button";
import Card from "../../core-components/Card";
import AddIcon from "../../../assets/svg-icons/add-icon.svg";
import RegisterArenaModal from "./components/RegisterArenaModal";
import { useState } from "react";

const MyArenas = () => {
  const [isRegisterArenaModalOpen, setIsRegisterArenaModalOpen] =
    useState(false);

  const openRegisterArenaModal = () => {
    setIsRegisterArenaModalOpen(true);
  };

  const closeRegisterArenaModal = () => {
    setIsRegisterArenaModalOpen(false);
  };

  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center">
        <Card>
          <div className="text-center text-gray-500 text-sm font-semibold">
            Looks like you haven't registered any arena yet. <br />
            Click the Button below to get started.
          </div>
          <div className="mt-5 w-full flex justify-center items-center">
            <Button onClick={openRegisterArenaModal} startIcon={<AddIcon />}>
              Register an Arena
            </Button>
          </div>
        </Card>
      </div>

      {/* Register Arena Modal */}
      <div>
        <RegisterArenaModal
          isOpen={isRegisterArenaModalOpen}
          onClose={closeRegisterArenaModal}
        />
      </div>
    </div>
  );
};

export default MyArenas;
