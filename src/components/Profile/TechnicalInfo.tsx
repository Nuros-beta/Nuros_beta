import { Select, TextArea } from "@/components/common/Input";
import { psychologicalTechniques, therapistRole } from "@/constants";

export const TechnicalInfo = () => {
	return (
		<>
			<label htmlFor="experienceDesc" className="flex flex-col gap-2 w-full mb-10">
				<span>*Describe your experience as a clinician</span>
				<TextArea name="experienceDesc" className="rounded-xl" />
			</label>

			<label htmlFor="psychologicalTechniques" className="flex flex-col gap-2 w-full mb-10">
				<span>*Which psychological techniques are you certified to use?</span>
				<Select name="psychologicalTechniques" className="rounded-full" options={psychologicalTechniques as unknown as string[]} />
			</label>

			<label htmlFor="therapistRole" className="flex flex-col gap-2 w-full mb-10">
				<span>*What is your role as a therapist?</span>
				<Select name="therapistRole" className="rounded-full" options={therapistRole as unknown as string[]} />
			</label>
		</>
	)
}
