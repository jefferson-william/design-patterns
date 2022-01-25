import TicketCalculator from './TicketCalculator'

export default class ParkingLot {
  tickets: { plate: string; checkinDate: Date }[]
  location: string
  ticketCalculator: TicketCalculator

  constructor(location: string, ticketCalculator: TicketCalculator) {
    this.tickets = []
    this.location = location
    this.ticketCalculator = ticketCalculator
  }

  checkin(plate: string, checkinDate: Date) {
    this.tickets.push({ plate, checkinDate })
  }

  checkout(plate: string, checkoutDate: Date) {
    const ticket = this.tickets.find((ticket) => ticket.plate === plate)
    if (!ticket) {
      throw new Error('Ticket not found')
    }
    const period = (checkoutDate.getTime() - ticket.checkinDate.getTime()) / (1000 * 60 * 60)
    const amount = this.ticketCalculator.calculate(period, ticket.checkinDate, checkoutDate)
    return {
      amount,
    }
  }
}
