import Appointments from '../infra/typeorm/entities/Appointments';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDto';

export default interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointments | undefined>;
  create(data: ICreateAppointmentDTO): Promise<Appointments>;
}
