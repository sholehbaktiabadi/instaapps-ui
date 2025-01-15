import { Card, Image } from "@nextui-org/react";
import { PostData } from "../interface/post";

export default function PostCard({ posts }: { posts: PostData[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
      {posts.map(({ id, caption, image_url }) =>
        <Card className="border-none">
          <Image
            key={id}
            alt={caption}
            className="object-cover"
            width={'100%'}
            src={image_url}
          />
        </Card>
      )}
    </div>
  );
}
