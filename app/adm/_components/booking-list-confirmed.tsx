"use server"

import { db } from "@/app/_lib/prisma"
import { endOfDay, startOfDay } from "date-fns"


export const getBookingsListConfirmed = async (date: Date) => {
    const bookings = await db.booking.findMany({
        where: {
            
            date: {
                lte: endOfDay(date),
                gte: startOfDay(date),
                lt: new Date(),
                
            }
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
    })
    return bookings
}