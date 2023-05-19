import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	Input,
} from "@material-tailwind/react";
import { useState } from "react";
import {useGetUnitsQuery} from "../services/unit/unitRealApi";

const Staff = () => {
	const { data } = useGetUnitsQuery();

	const [openUnits, setOpen] = useState<number[]>([]);

	const isOpen = (value: number) => {
		return openUnits.indexOf(value) > -1;
	};
	const handleOpen = (value: number) => {
		const index = openUnits.indexOf(value);
		if (index > -1) {
			setOpen(openUnits.filter((item) => item !== value));
		} else {
			setOpen([...openUnits, value]);
		}
	};

	return (
		<div>
			<div className="m-6 flex flex-col gap-6">
				<Input size="lg" placeholder="Поиск" />
			</div>

			<div className="p-4 rounded-lg" style={{ backgroundColor: "#F2F2F7" }}>
					<Accordion open={isOpen(2)}>
						<AccordionHeader onClick={() => handleOpen(2)}>
							Офис г. Санкт-Петербург
						</AccordionHeader>
						<AccordionBody className={"p-2"}>
							<Accordion open={isOpen(22)}>
								<AccordionHeader onClick={() => handleOpen(22)}>
									Отдел разработки
								</AccordionHeader>

								<AccordionBody className={"p-2"}>

									<Accordion open={isOpen(221)}>
										<AccordionHeader onClick={() => handleOpen(221)}>
											Команда разработки фронтенда
										</AccordionHeader>
										<AccordionBody className={"p-2"}>
											<span className="link">Иванов Иван Иванович</span><span className="balance">1235 coins</span>
											<br/>
											<span className="link">Смирнова Анастасия Петровна</span><span className="balance">5320 coins</span>
											<br/>
											<span className="link">Королева Екатерина Дмитриевна</span><span className="balance">650 coins</span>
										</AccordionBody>
									</Accordion>

									<Accordion open={isOpen(222)}>
										<AccordionHeader onClick={() => handleOpen(222)}>
											Команда разработки бэкенда
										</AccordionHeader>
										<AccordionBody className={"p-2"}>
											<span className="link">Петров Петр Петрович</span><span className="balance">340 coins</span>
											<br/>
											<span className="link">Сидоров Сидор Сидорович</span><span className="balance">720 coins</span>
											<br/>
											<span className="link">Федоров Дмитрий Иванович</span><span className="balance">830 coins</span>
										</AccordionBody>
									</Accordion>

									<Accordion open={isOpen(223)}>
										<AccordionHeader onClick={() => handleOpen(223)}>
											Команда тестирования
										</AccordionHeader>
										<AccordionBody className={"p-2"}>
											<span className="link">Новикова Анастасия Александровна</span><span className="balance">1360 coins</span>
											<br/>
											<span className="link">Кузнецов Алексей Владимирович</span><span className="balance">120 coins</span>
											<br/>
											<span className="link">Соколова Ольга Игоревна</span><span className="balance">540 coins</span>
										</AccordionBody>
									</Accordion>

								</AccordionBody>
							</Accordion>

							<Accordion open={isOpen(4)}>
								<AccordionHeader onClick={() => handleOpen(4)}>
									Отдел дизайна
								</AccordionHeader>

								<AccordionBody className={"p-2"}>

									<Accordion open={isOpen(41)}>
										<AccordionHeader onClick={() => handleOpen(41)}>
											Команда дизайнеров интерфейсов
										</AccordionHeader>
										<AccordionBody className={"p-2"}>
											<span className="link">Смирнова Елена Владимировна</span><span className="balance">450 coins</span>
											<br/>
											<span className="link">Попов Андрей Сергеевич</span><span className="balance">730 coins</span>
											<br/>
											<span className="link">Козлова Анна Максимовна</span><span className="balance">630 coins</span>
										</AccordionBody>
									</Accordion>

									<Accordion open={isOpen(42)}>
										<AccordionHeader onClick={() => handleOpen(42)}>
											Команда графических дизайнеров
										</AccordionHeader>
										<AccordionBody className={"p-2"}>
											<span className="link">Ковалев Иван Сергеевич</span><span className="balance">420 coins</span>
											<br/>
											<span className="link">Михайлова Оксана Александровна</span><span className="balance">580 coins</span>
										</AccordionBody>
									</Accordion>

								</AccordionBody>
							</Accordion>

							<Accordion open={isOpen(5)}>
								<AccordionHeader onClick={() => handleOpen(5)}>
									Отдел продукта
								</AccordionHeader>

								<AccordionBody className={"p-2"}>

									<Accordion open={isOpen(51)}>
										<AccordionHeader onClick={() => handleOpen(51)}>
											Продуктовый менеджер
										</AccordionHeader>
										<AccordionBody className={"p-2"}>
											<span className="link">Козлов Максим Сергеевич</span><span className="balance">750 coins</span>
										</AccordionBody>
									</Accordion>

									<Accordion open={isOpen(52)}>
										<AccordionHeader onClick={() => handleOpen(52)}>
											Команда аналитики
										</AccordionHeader>
										<AccordionBody className={"p-2"}>
											<span className="link">Иванова Ольга Викторовна</span><span className="balance">750 coins</span>
											<br/>
											<span className="link">Соколов Сергей Андреевич</span><span className="balance">950 coins</span>
											<br/>
											<span className="link">Петрова Екатерина Дмитриевна</span><span className="balance">1740 coins</span>
										</AccordionBody>
									</Accordion>

									<Accordion open={isOpen(53)}>
										<AccordionHeader onClick={() => handleOpen(53)}>
											Команда менеджмента продукта
										</AccordionHeader>
										<AccordionBody className={"p-2"}>
											<span className="link">Сидорова Анастасия Ивановна</span><span className="balance">420 coins</span>
											<br/>
											<span className="link">Федорова Оксана Владимировна</span><span className="balance">750 coins</span>
										</AccordionBody>
									</Accordion>

								</AccordionBody>
							</Accordion>

							<Accordion open={isOpen(6)}>
								<AccordionHeader onClick={() => handleOpen(6)}>
									Отдел маркетинга
								</AccordionHeader>

								<AccordionBody className={"p-2"}>

									<Accordion open={isOpen(61)}>
										<AccordionHeader onClick={() => handleOpen(61)}>
											Команда маркетологов
										</AccordionHeader>
										<AccordionBody className={"p-2"}>
											<span className="link">Никитина Анна Александровна</span><span className="balance">730 coins</span>
											<br/>
											<span className="link">Михайлов Игорь Васильевич</span><span className="balance">340 coins</span>
											<br/>
											<span className="link">Смирнов Денис Сергеевич</span><span className="balance">620 coins</span>
										</AccordionBody>
									</Accordion>

									<Accordion open={isOpen(62)}>
										<AccordionHeader onClick={() => handleOpen(62)}>
											Команда PR
										</AccordionHeader>
										<AccordionBody className={"p-2"}>
											<span className="link">Кузнецова Елена Андреевна</span><span className="balance">630 coins</span>
											<br/>
											<span className="link">Попова Анна Сергеевна</span><span className="balance">850 coins</span>
										</AccordionBody>
									</Accordion>

								</AccordionBody>
							</Accordion>

							<Accordion open={isOpen(7)}>
								<AccordionHeader onClick={() => handleOpen(7)}>
									Отдел кадров
								</AccordionHeader>

								<AccordionBody className={"p-2"}>

									<Accordion open={isOpen(71)}>
										<AccordionHeader onClick={() => handleOpen(71)}>
											Специалисты по подбору персонала
										</AccordionHeader>
										<AccordionBody className={"p-2"}>
											<span className="link">Иванова Екатерина Сергеевна</span><span className="balance">70 coins</span>
											<br/>
											<span className="link">Петрова Наталья Андреевна</span><span className="balance">180 coins</span>
										</AccordionBody>
									</Accordion>

									<Accordion open={isOpen(72)}>
										<AccordionHeader onClick={() => handleOpen(72)}>
											HR-менеджеры
										</AccordionHeader>
										<AccordionBody className={"p-2"}>
											<span className="link">Соколова Анна Петровна</span><span className="balance">740 coins</span>
											<br/>
											<span className="link">Федорова Татьяна Ивановна</span><span className="balance">120 coins</span>
										</AccordionBody>
									</Accordion>

								</AccordionBody>
							</Accordion>

						</AccordionBody>
					</Accordion>

				<Accordion open={isOpen(5)}>
					<AccordionHeader onClick={() => handleOpen(5)}>
						Офис г. Томск
					</AccordionHeader>
					<AccordionBody className={"p-2"}>

						<Accordion open={isOpen(1001)}>
							<AccordionHeader onClick={() => handleOpen(1001)}>
								Отдел разработки
							</AccordionHeader>
							<AccordionBody className={"p-2"}>
								<Accordion open={isOpen(1011)}>
									<AccordionHeader onClick={() => handleOpen(1011)}>
										Команда разработки фронтенда
									</AccordionHeader>
									<AccordionBody className={"p-2"}>
										<span className="link">Иван Арсеньев</span><span className="balance">120 coins</span>
										<br/>
										<span className="link">Андрей Радионов</span><span className="balance">240 coins</span>
									</AccordionBody>
								</Accordion>

								<Accordion open={isOpen(1012)}>
									<AccordionHeader onClick={() => handleOpen(1012)}>
										Команда разработки бэкенда
									</AccordionHeader>
									<AccordionBody className={"p-2"}>
										<span className="link">Егор Шамов</span><span className="balance">5420 coins</span>
										<br/>
										<span className="link">Александр Зоркин</span><span className="balance">5230 coins</span>
									</AccordionBody>
								</Accordion>

							</AccordionBody>
						</Accordion>

						<Accordion open={isOpen(51)}>
							<AccordionHeader onClick={() => handleOpen(51)}>
								Отдел дизайна
							</AccordionHeader>
							<AccordionBody className={"p-2"}>
								<Accordion open={isOpen(511)}>
									<AccordionHeader onClick={() => handleOpen(511)}>
										Главный дизайнер
									</AccordionHeader>
									<AccordionBody className={"p-2"}>
										<span className="link">Карина Шуман</span><span className="balance">1230 coins</span>
									</AccordionBody>
								</Accordion>
							</AccordionBody>
						</Accordion>

					</AccordionBody>
				</Accordion>

				<Accordion open={isOpen(1)}>
					<AccordionHeader onClick={() => handleOpen(1)}>
						Главный офис г. Москва
					</AccordionHeader>
					<AccordionBody className={"p-2"}>
						<Accordion open={isOpen(12)}>
							<AccordionHeader onClick={() => handleOpen(12)}>
								Отдел разработки
							</AccordionHeader>

							<AccordionBody className={"p-2"}>

								<Accordion open={isOpen(121)}>
									<AccordionHeader onClick={() => handleOpen(121)}>
										Команда разработки фронтенда
									</AccordionHeader>
									<AccordionBody className={"p-2"}>
										<span className="link">Иванов Иван Иванович</span><span className="balance">120 coins</span>
									</AccordionBody>
								</Accordion>

								<Accordion open={isOpen(122)}>
									<AccordionHeader onClick={() => handleOpen(122)}>
										Команда разработки бэкенда
									</AccordionHeader>
									<AccordionBody className={"p-2"}>
										<span className="link">Петров Петр Петрович</span><span className="balance">430 coins</span>
										<br/>
										<span className="link">Сидоров Сидор Сидорович</span><span className="balance">40 coins</span>
									</AccordionBody>
								</Accordion>

								<Accordion open={isOpen(123)}>
									<AccordionHeader onClick={() => handleOpen(123)}>
										Команда тестирования
									</AccordionHeader>
									<AccordionBody className={"p-2"}>
										<span className="link">Новикова Анастасия Александровна</span><span className="balance">640 coins</span>
										<br/>
										<span className="link">Кузнецов Алексей Владимирович</span><span className="balance">2630 coins</span>
									</AccordionBody>
								</Accordion>

							</AccordionBody>
						</Accordion>

						<Accordion open={isOpen(13)}>
							<AccordionHeader onClick={() => handleOpen(13)}>
								Отдел дизайна
							</AccordionHeader>
							<AccordionBody className={"p-2"}>
								<Accordion open={isOpen(131)}>
									<AccordionHeader onClick={() => handleOpen(131)}>
									Команда дизайнеров интерфейсов
									</AccordionHeader>
									<AccordionBody className={"p-2"}>
										<span className="link">Смирнова Елена Владимировна</span><span className="balance">10 coins</span>
										<br/>
										<span className="link">Попов Андрей Сергеевич</span><span className="balance">750 coins</span>
									</AccordionBody>
								</Accordion>
							</AccordionBody>
						</Accordion>

						<Accordion open={isOpen(14)}>
							<AccordionHeader onClick={() => handleOpen(14)}>
								Отдел продукта
							</AccordionHeader>
							<AccordionBody className={"p-2"}>

								<Accordion open={isOpen(141)}>
									<AccordionHeader onClick={() => handleOpen(141)}>
										Продуктовый менеджер
									</AccordionHeader>
									<AccordionBody className={"p-2"}>
										<span className="link">Козлов Максим Сергеевич</span><span className="balance">5730 coins</span>
									</AccordionBody>
								</Accordion>

								<Accordion open={isOpen(142)}>
									<AccordionHeader onClick={() => handleOpen(142)}>
										Команда аналитики
									</AccordionHeader>
									<AccordionBody className={"p-2"}>
										<span className="link">Иванова Ольга Викторовна</span><span className="balance">120 coins</span>
										<br/>
										<span className="link">Соколов Сергей Андреевич</span><span className="balance">450 coins</span>
									</AccordionBody>
								</Accordion>

							</AccordionBody>
						</Accordion>

						<Accordion open={isOpen(15)}>
							<AccordionHeader onClick={() => handleOpen(15)}>
								Отдел маркетинга
							</AccordionHeader>
							<AccordionBody className={"p-2"}>

								<Accordion open={isOpen(151)}>
									<AccordionHeader onClick={() => handleOpen(151)}>
										Команда маркетологов
									</AccordionHeader>
									<AccordionBody className={"p-2"}>
										<span className="link">Никитина Анна Александровна</span><span className="balance">640 coins</span>
										<br/>
										<span className="link">Михайлов Игорь Васильевич</span><span className="balance">420 coins</span>
									</AccordionBody>
								</Accordion>

							</AccordionBody>
						</Accordion>
					</AccordionBody>
				</Accordion>
			</div>
		</div>
	);
};

export default Staff;
