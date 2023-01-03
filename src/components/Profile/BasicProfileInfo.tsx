import { Input, Select } from "components/common/Input";

const specialties = [
	"Clinical Health psychology",
	"Clinical Neuropsychology",
	"Psychoanalytic and psychodynamic psychology",
	"School psychology",
	"Clinical psychology",
	"Clinical child and adolescent psychology",
	"Business psychology",
	"Behavioral and cognitive psychology",
	"Social psychology",
	"Couple and family psychology",
	"Geropsychology",
	"Habitational psychology",
	"Group psychology",
	"Clinical psychopharmacology",
	"Other",
]

export const BasicProfileInfo = () => {
	return (
		<>
			<label htmlFor="specialty" className="flex flex-col gap-2 w-full mb-10">
				<span >Specialty</span>
				<Select name="specialty" className="rounded-full" options={specialties} />
			</label>

			<label htmlFor="experienceYears" className="flex flex-col gap-2 w-full mb-10">
				<span >Years of experience</span>
				<Input name="experienceYears" type="number" className="rounded-full" />
			</label>

			<label htmlFor="education" className="flex flex-col gap-2 w-full mb-10">
				<span >What education in mental health care did you follow</span>
				<Input name="education" type="text" className="rounded-full" />
			</label>

			<label htmlFor="location" className="flex flex-col gap-2 mb-10">
				<span>Location</span>
				<Input name="location" type="text" className="rounded-full" />
			</label>
		</>
	)
}
