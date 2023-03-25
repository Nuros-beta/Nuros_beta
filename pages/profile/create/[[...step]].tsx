import { psychologicalTechniques, specialties, therapistRole } from "@/constants";
import clsx from "clsx";
import { Form } from "components/common/Form";
import MainLayout from "components/MainLayout";
import { BasicProfileInfo } from "components/Profile/BasicProfileInfo";
import { BiographyInfo } from "components/Profile/BiographyInfo";
import { PersonalInfo } from "components/Profile/PersonalInfo";
import { ProfileType } from "components/Profile/ProfileType";
import { SecurityInfo } from "components/Profile/SecurityInfo";
import { TechnicalInfo } from "components/Profile/TechnicalInfo";
import { useFirebase } from "context/firebase";
import { useCreateProfile } from "hooks/api/use-profile";

import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const caregiverWizardMap: Record<number, any> = {
	1: PersonalInfo,
	2: ProfileType,
	3: BasicProfileInfo,
	4: TechnicalInfo,
	5: BiographyInfo,
	6: SecurityInfo,
	7: null
}

const caretakerWizardMap: Record<number, any> = {
	1: PersonalInfo,
	2: ProfileType,
	3: BiographyInfo,
	4: null
}

const caretakerSchema = z.object({
	profileType: z.enum(["caretaker", "caregiver"]),
	firstName: z.string().min(2).max(50),
	lastName: z.string().min(2).max(50),
	age: z.number(),
	gender: z.enum(["male", "female", "other"]),
	biography: z.string().min(10).max(500),
	coverLetter: z.string().min(10).max(500),
})

const caregiverSchema = caretakerSchema.extend({
	psychologicalTechniques: z.enum(psychologicalTechniques),
	therapistRole: z.enum(therapistRole),
	experienceDesc: z.string().min(10).max(500),
	specialty: z.enum(specialties),
	education: z.string().min(10).max(500),
	experienceYears: z.number(),
	location: z.string().min(2).max(50),
	complaint: z.enum(["yes", "no"]),
	criminalRecord: z.enum(["yes", "no"]),
	workPermit: z.enum(["yes", "no"]),
})


const CreateProfile = () => {
	const router = useRouter()
	const { user } = useFirebase()
	const { createProfile, isLoading: submitting } = useCreateProfile()
	const [schema, setSchema] = useState(caretakerSchema)

	const methods = useForm({ resolver: zodResolver(schema) })
	const { getValues, formState: {errors} } = methods

	const isCareGiver = getValues("profileType") === "caregiver"
	const currentStep = parseInt(router.query.step?.[0] ?? "1") ?? 1
	const ActiveWizard = isCareGiver ? caregiverWizardMap[currentStep] : caretakerWizardMap[currentStep]
	const nextWizard = isCareGiver ? caregiverWizardMap[currentStep + 1] : caretakerWizardMap[currentStep + 1]

	const handleNext = () => {
		const formData = getValues()
		const validationResult = (isCareGiver ? caregiverSchema : caretakerSchema).safeParse(formData);

		if (!validationResult.success) {
			// Form data is invalid, show an error message
			console.error(validationResult.error);
			return
		}
		router.push(`${currentStep + 1}`)
	}

	const handleSubmit = () => {
		const formData = getValues()

		const { profileType, ...rest } = formData
		const data = { ...rest, uid: user?.uid, email: user?.email }
		console.log("data: ", formData)
		createProfile({ profileType, data } as any)
	}

	useEffect(() => {
		console.log("running effect")
		console.log("isCaregiver: ", isCareGiver)
		if (!isCareGiver) {
			setSchema(caretakerSchema)
		} else {
			setSchema(caregiverSchema)
		}
	}, [isCareGiver])

	console.log("errors: ", errors)

	// schema = useMemo(() => {
	// 	if (isCareTaker) {
	// 		return z.object({
	// 			profileType: z.enum(["caretaker", "caregiver"]),
	// 			firstName: z.string().min(2).max(50),
	// 			lastName: z.string().min(2).max(50),
	// 			age: z.number(),
	// 			gender: z.enum(["male", "female", "other"]),
	// 			biography: z.string().min(10).max(500),
	// 			coverLetter: z.string().min(10).max(500),
	// 		})
	// 	} else {
	// 		return z.object({
	// 			profileType: z.enum(["caretaker", "caregiver"]),
	// 			firstName: z.string().min(2).max(50),
	// 			lastName: z.string().min(2).max(50),
	// 			age: z.number(),
	// 			gender: z.enum(["male", "female", "other"]),
	// 			biography: z.string().min(10).max(500),
	// 			coverLetter: z.string().min(10).max(500),
	// 			psychologicalTechniques: z.enum(psychologicalTechniques),
	// 			therapistRole: z.enum(therapistRole),
	// 			experienceDesc: z.string().min(10).max(500),
	// 			specialty: z.enum(specialties),
	// 			education: z.string().min(10).max(500),
	// 			experienceYears: z.number(),
	// 			location: z.string().min(2).max(50),
	// 			complaint: z.enum(["yes", "no"]),
	// 			criminalRecord: z.enum(["yes", "no"]),
	// 			workPermit: z.enum(["yes", "no"]),
	// 		})
	// 	}
	// }, [isCareTaker])

	return (
		<MainLayout title="Complete your profile">
			<FormProvider {...methods}>
				<Form onSubmit={() => { }} className="">
					<ActiveWizard />
					{!!nextWizard ?
						<button className="btn mt-10" onClick={() => handleNext()}>Next</button> :
						<button className={clsx("btn mt-10", { "loading": submitting })} onClick={() => handleSubmit()}>{submitting ? "loading" : "Submit"}</button>
					}
				</Form>
			</FormProvider>
		</MainLayout>
	)
}

// CreateProfile.auth = true;

export default CreateProfile
