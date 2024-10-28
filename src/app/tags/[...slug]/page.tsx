import { getPaginatedPostsByTag, getAllTags } from '@/lib/post';
import PostList from '@/components/post/PostList';
import PostPagination from '@/components/common/Pagination';
import ScrollableItemList from '@/components/common/ScrollableItemList';

type Props = {
  params: { slug: string[] };
};

const pageSize = 5;

export default async function TagPage({ params }: Props) {
  const tags = await getAllTags();
  const [tag, page] = params.slug;
  const {
    items: posts,
    totalPages,
    currentPage,
  } = await getPaginatedPostsByTag(tag, pageSize, page);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollableItemList currentItem={tag} items={tags} basePath="/tags" />
      <div className="flex-grow overflow-y-auto p-4">
        <PostList title={`${tag} 태그 포스트`} posts={posts} />
        <PostPagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/tags/${tag}`}
        />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  const params = [];

  for (const tag of tags) {
    const { totalPages } = await getPaginatedPostsByTag(tag.item, pageSize);

    params.push({ slug: [tag.item] });

    for (let page = 2; page <= totalPages; page++) {
      params.push({ slug: [tag.item, page.toString()] });
    }
  }
  return params;
}
