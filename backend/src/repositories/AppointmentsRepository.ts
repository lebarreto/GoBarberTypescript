import { isEqual } from 'date-fns';
import Appointments from '../models/Appointments';

class AppointmentsRepository {
  private appointments: Appointments[];

  constructor() {
    this.appointments = [];
  }

  public findByDate(date: Date): Appointments | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  public create(provider: string, date: Date): Appointments {
    const appointment = new Appointments(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
