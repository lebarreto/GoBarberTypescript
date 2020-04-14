import { isEqual } from 'date-fns';
import Appointments from '../models/Appointments';

interface CreateAppointment {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointments[];

  constructor() {
    this.appointments = [];
  }

  public listAll(): Appointments[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointments | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  public create({ provider, date }: CreateAppointment): Appointments {
    const appointment = new Appointments({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
