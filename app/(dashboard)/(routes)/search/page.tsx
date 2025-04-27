import { db } from '@/lib/db'
import React from 'react'
import { Categories } from './_components/categories'
import { SearchInput } from '@/components/Search-input'
import { getCourses } from '@/actions/get-courses'
import { CoursesList } from '@/components/courses-list'
import { getCurrentUser } from '@/lib/getServerUser'
import { type Metadata } from 'next'

interface SearchPageProps {
  searchParams: Promise<{
    title?: string
    categoryId?: string
  }>
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams; // ⬅️ обов'язково await

  const user = await getCurrentUser();
  const userId = user?.id;

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  const courses = await getCourses({
    userId,
    ...params,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>

      <div className="p-6">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
