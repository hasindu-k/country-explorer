import * as Dialog from "@radix-ui/react-dialog";

const LogoutConfirmDialog = ({ onConfirm }) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm">
        Logout
      </button>
    </Dialog.Trigger>

    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <Dialog.Content className="fixed left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg space-y-4">
        <Dialog.Title className="text-lg font-bold text-gray-800">
          Confirm Logout
        </Dialog.Title>
        <Dialog.Description className="text-sm text-gray-600">
          Are you sure you want to log out?
        </Dialog.Description>

        <div className="flex justify-end gap-2 mt-4">
          <Dialog.Close asChild>
            <button className="px-4 py-2 bg-gray-200 rounded-md text-sm">
              Cancel
            </button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
            >
              Logout
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default LogoutConfirmDialog;
