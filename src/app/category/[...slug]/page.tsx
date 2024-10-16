import { getPaginatedPostsByCategory, getAllCategories } from '@/lib/post';
import PostList from '@/components/post/PostList';
import PostPagination from '@/components/common/Pagination';
import ScrollableItemList from '@/components/common/ScrollableItemList';

type Props = {
  params: { slug: string[] };
};

const pageSize = 5;

export default async function CategoryPage({ params }: Props) {
  const categories = await getAllCategories();
  const [category, page] = params.slug;
  const {
    items: posts,
    currentPage,
    totalPages,
  } = await getPaginatedPostsByCategory(category, pageSize, page);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollableItemList currentItem={category} items={categories} basePath="/category" />
      <div className="flex-grow overflow-y-auto p-4">
        <PostList title={`${category} 포스트`} posts={posts} />
        <PostPagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/category/${category}`}
        />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  const params = [];

  for (const category of categories) {
    const { totalPages } = await getPaginatedPostsByCategory(category.item, pageSize);

    params.push({ slug: [category.item] });

    for (let page = 2; page <= totalPages; page++) {
      params.push({ slug: [category.item, page.toString()] });
    }
  }

  return params;
}
