import { Input } from "components/common/Input";

export const SecurityInfo = () => {
	return (
		<>
			<label htmlFor="complaint" className="flex flex-col gap-2 w-full mb-10">
				<span>Has there been any official complaint filed against you as a clinician?</span>
				<Input name="complaint" type="text" className="rounded-full" />
			</label>

			<label htmlFor="criminalRecord" className="flex flex-col gap-2 mb-10">
				<span>Do you currently have or have had a criminal record?</span>
				<Input name="criminalRecord" type="text" className="rounded-full" />
			</label>

			<label htmlFor="workPermit" className="flex flex-col gap-2 mb-10">
				<span>Are you allowed to work as a clinician in your country of residence? Send proof (i.e., BIG registration in NL)</span>
				<Input name="workPermit" type="text" className="rounded-full" />
			</label>
		</>
	)
}
