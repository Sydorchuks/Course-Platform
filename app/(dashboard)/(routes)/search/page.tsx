import { db } from '@/lib/db'
import React from 'react'
import { Categories } from './_components/categories'
import { SearchInput } from '@/components/Search-input'
import { getCourses } from '@/actions/get-courses'
import { CoursesList } from '@/components/courses-list'
import { getCurrentUser } from '@/lib/getServerUser'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Metadata } from 'next'
import { redirect } from 'next/navigation'

interface SearchPageProps {
  searchParams: Promise<{
    title?: string
    categoryId?: string
  }>
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams; 

  const user = await getCurrentUser();
  const userId = user?.id;

  if(!userId){
    redirect("/")
  }

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

      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
