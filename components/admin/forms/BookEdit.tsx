"use client";

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const BookEdit = ({ id }: {id: string}) => {
  const router = useRouter()
  // redirect to edit book page with current book content
  const handleEdit = () => {
    router.push(`/admin/books/edit/${id}`)
  }
  return (
    <button className="text-blue-500 cursor-pointer" onClick={handleEdit}>
      <Image
        src="/icons/admin/edit.svg"
        alt="Edit"
        width={20}
        height={20}
        className="mr-2"
      />
    </button>
  )
}

export default BookEdit