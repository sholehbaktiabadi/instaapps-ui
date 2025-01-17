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
  Input,
} from "@nextui-org/react";
import { PostData } from "../interface/post";
import { useState } from "react";
import { InstaApi } from "../api";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function PostCard({ posts }: { posts: PostData[] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [post, setPost] = useState<PostData>()
  const [cookies] = useCookies(['token'])
  const [comment, setComment] = useState<string>()

  const getPost = async (id: number) => {
    try {
      const res = await InstaApi.getPost(id, cookies.token)
      const response = res.data
      setPost(response.data)
    } catch (error) {
      // TODO - add error handler
      console.log(error)
    }
  }

  const commentPost = async () => {
    try {
      const res = await InstaApi.createPostComment({ content: comment, post_id: post?.id }, cookies.token)
      setComment('')
      const response = res.data
      setPost(response.data)
      getPost(post?.id as number)
    } catch (error) {
      // TODO - add error handler
      console.log(error)
    }
  }

  const likeOrDelete = async (amilike: boolean) => {
    try {
      amilike ? await InstaApi.deletePostLike(post?.id as number, cookies.token) : await InstaApi.createPostLike({ post_id: post?.id }, cookies.token)
      getPost(post?.id as number)
    } catch (error) {
      // TODO - add error handler
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
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1" />
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
                          src={'https://i.pravatar.cc/150?u=a042581f4e29026704d'}
                        />
                      </div>
                      <div className="flex flex-row">
                        <p className="font-bold mr-2">{post?.user?.name}</p>
                        <p className="font-light">{' - ( author )'}</p>
                      </div>
                    </div>

                    <hr className="border-slate-500 my-2" />

                    <div className="flex flex-col mb-4">
                      {post?.comments?.map(({ content, user }) =>
                        <div className="flex flex-row my-2">
                          <div className="mr-3">
                            <Image
                              height={30}
                              width={30}
                              src={post?.image_url}
                            />
                          </div>
                          <div className="flex flex-row">
                            <p className="text-sm font-bold mr-2">{user?.name}</p>
                            <p className="text-sm font-xs">{content}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <div className="ps-6 flex">
              <p className="text-sm text-slate-200 my-3">{post?.caption}</p>
              </div>
              <div className="ps-6 flex flex-row items-center">
                <FontAwesomeIcon icon={faHeart} size="lg" color={post?.amilike ? "red": "white"} onClick={() => likeOrDelete(post?.amilike as boolean)} className="mr-2 hover:cursor-pointer" />
                <div className="font-xs text-slate-300">{post?.likes_count}</div>
              </div>
              <ModalFooter>
                <div className="flex flex-row items-center">
                <Input label="Comment" type="text" name="comment" onChange={(e)=> setComment(e.target.value) } value={comment} />
                <Button color="primary" onPress={commentPost} className="ms-2">
                  Send
                </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
