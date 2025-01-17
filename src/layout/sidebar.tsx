import { Listbox, ListboxItem, Textarea } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useCookies } from "react-cookie";
import { FormEvent, useState } from "react";
import { env } from "../config/env";
import { InstaApi } from "../api";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imageUrl, setImageUrl] = useState<string>()
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()
  const items = [
    {
      key: "Post",
      label: "Post",
      route: '/Post'
    },
  ];
  const onUploadImage = async () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      const formData = new FormData();
      formData.append('image', fileInput.files[0]);
      const response = await fetch(`${env.VITE_INSTAAPI_BASE_URL}/api/upload-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cookies.token}`,
          'Accept': 'application/json',
        },
        body: formData,
      });
      const { url } = await response.json();
      setImageUrl(url)
    }
  };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        try {
            await InstaApi.addPost({...data, image_url: imageUrl}, cookies.token)
            window.location.href = '/'
        } catch (error) {
          // TODO - add error handler
            console.log(error)
        }

    };

  return (<>
    <Listbox items={items} className="border-e-1 border-slate-500 h-full">
      {(item) => (
        <ListboxItem onPress={onOpen}
        >
          {item.label}
        </ListboxItem>
      )}
    </Listbox>
    <Modal isOpen={isOpen} className={'dark'} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add Post</ModalHeader>
            <form className="flex flex-col space-x-6" onSubmit={onSubmit}>
              <ModalBody>
                <Textarea className="max-w-xs" label="caption" name="caption" placeholder="Enter your caption of image" />
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input type="file" className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100
                "
                onChange={onUploadImage}
                />
                </label>
              </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose} type="submit">
                Post
              </Button>
            </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  </>
  );
}
