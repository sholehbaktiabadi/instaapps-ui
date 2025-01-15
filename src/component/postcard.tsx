import {
  Card,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { PostData } from "../interface/post";
import { useState } from "react";
import { InstaApi } from "../api";
import { useCookies } from "react-cookie";

export default function PostCard({ posts }: { posts: PostData[] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [post, setPost] = useState<PostData>()
  const [cookies] = useCookies(['token'])

  const getPost = async (id: number) => {
    try {
      const res = await InstaApi.getPost(id, cookies.token)
      const response = res.data
      setPost(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
        {posts.map(({ id, caption, image_url }) =>
          <div>
            <Card className="border-none hover:cursor-pointer">
              <Image
                onClick={() => { getPost(id as number); onOpen() }}
                key={id}
                alt={caption}
                className="object-cover"
                width={'100%'}
                src={image_url}
              />
            </Card>
          </div>
        )}
      </div>
      <Modal isOpen={isOpen} size="5xl" className="dark" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{post?.caption}</ModalHeader>
              <ModalBody>
                <div className="flex w-full">
                  <div className="basis-1/2">
                    <Image
                      key={post?.id}
                      alt={post?.caption}
                      className="object-cover"
                      width={'100%'}
                      src={post?.image_url}
                    />
                  </div>
                  <div className="basis-1/2 h-full py-3 px-5">
                    <div className="flex flex-row items-center">
                      <div className="mr-3">
                        <Image
                          height={30}
                          width={30}
                          src={post?.image_url}
                        />
                      </div>
                      <div className="flex flex-row">
                        <p className="font-bold mr-2">{post?.user?.name}</p>
                        <p className="font-light">{' - ( author )'}</p>
                      </div>
                    </div>

                    <hr className="border-slate-500 my-2" />

                    <div className="flex flex-col mb-4">
                      {post?.comments?.map(({ content }) =>
                        <div className="flex flex-row my-2">
                          <div className="mr-3">
                            <Image
                              height={30}
                              width={30}
                              src={post?.image_url}
                            />
                          </div>
                          <div className="flex flex-row">
                            <p className="text-sm font-bold mr-2">username</p>
                            <p className="text-sm font-xs">{content}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
