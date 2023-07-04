import { Input, TextArea } from "components/common/Input";

export const BiographyInfo = () => {
	return (
		<>
			<label htmlFor="biography" className="flex flex-col gap-2 w-full mb-10">
				<span >*Biography</span>
				<TextArea name="biography" className="rounded-xl" />
			</label>

			<label htmlFor="coverLetter" className="flex flex-col gap-2 mb-10">
				<span>*Cover Letter</span>
				<TextArea name="coverLetter" className="rounded-xl" />
			</label>

			<label htmlFor="profilePicture" className="flex flex-col gap-2 mb-10">
				<span>*Upload a profile picture</span>
				<Input name="profilePicture" type="file" className="file-input file-input-bordered rounded-full" />
			</label>
		</>
	)
}
