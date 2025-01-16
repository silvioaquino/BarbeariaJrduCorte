import { getServerSession } from "next-auth";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { Calendar } from "../_components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { getBookings } from "../_actions/get-bookings";
import { BarbershopService, Booking } from "@prisma/client";
import { getConfirmedBookings } from "../_data/get-confirmed-bookings";
import { getConcludedBookings } from "../_data/get-concluded-bookings";
import { redirect } from "next/dist/server/api-utils";
import Calendario from "./_components/calendar";
import { notFound } from "next/navigation";


const Administrador = async () => {
  // Recuperar a sessão do usuário (ver se ele estar logado ou não)
  const session = await getServerSession(authOptions)
  //Se ele não estiver logado, redirecionar para a página de login
  //if (!session?.user) {
    //return notFound()
  //}

  const bookings = await db.booking.findMany({
    where: {
      date: new Date('2024-12-25T03:00:00.000Z'),
    }
  })
  
  

  return ( 
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-xl font-bold text-center">Agendamentos</h1>
      
        <Calendario/>
        

        <h2 className="text-xl font-bold text-center">Confirmados</h2>

        
        {bookings.map((booking) => (
          <BookingItem key={booking.id} booking={JSON.parse(JSON.stringify(booking))} />
        ))}
          

      </div>
    </>
  );
}
 
export default Administrador;