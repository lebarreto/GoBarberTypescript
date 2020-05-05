import 'reflect-metadata';

import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1212121212',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1212121212');
  });

  // it('should not be able to create two appointments at the same time', () => {
  //   expect(1 + 2).toBe(3);
  // });
});
