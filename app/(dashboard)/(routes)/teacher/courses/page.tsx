/* eslint-disable react-hooks/rules-of-hooks */

import { db } from '@/lib/db'
import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/columns'

const CoursesPage = async() => {
  const courses = await db.course.findMany({
    orderBy:{
      createdAt:"desc"
    }
  })


  return (
    <div className='p-6'>
      <DataTable columns={columns} data={courses} />
    </div>
  )
}

export default CoursesPage