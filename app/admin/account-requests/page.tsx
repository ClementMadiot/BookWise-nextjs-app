import AccountRequests from '@/components/admin/AccountRequests'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import React from 'react'

const page = async () => {
  
  const allUsers = (await db
    .select()
    .from(users)).map(user => ({
    ...user,
    createdAt: user.createdAt ? user.createdAt.toISOString() : null,
  })) as User[]

  if (allUsers.length < 1) return null
  return (
    <section className="w-full rounded-2xl bg-white p-4">
      <AccountRequests users={allUsers} />
    </section>
  )
}

export default page