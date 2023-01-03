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
import { FormProvider, useForm } from "react-hook-form";

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

const CreateProfile = () => {
	const methods = useForm()
	const router = useRouter()
	const { user } = useFirebase()
	const { createProfile, isLoading: submitting } = useCreateProfile()

	const { getValues } = methods
	const isCareTaker = getValues("profileType") === "caretaker"
	const currentStep = parseInt(router.query.step?.[0] ?? "1") ?? 1
	const ActiveWizard = isCareTaker ? caretakerWizardMap[currentStep] : caregiverWizardMap[currentStep]
	const nextWizard = isCareTaker ? caretakerWizardMap[currentStep + 1] : caregiverWizardMap[currentStep + 1]

	const handleNext = () => {
		router.push(`${currentStep + 1}`)
	}

	const handleSubmit = () => {
		const values = getValues()

		const { profileType, ...rest } = values
		const data = { ...rest, uid: user?.uid, email: user?.email }
		console.log("data: ", data)
		createProfile({ profileType, data } as any)
	}

	return (
		<MainLayout title="Complete your profile">
			<FormProvider {...methods}>
				<Form onSubmit={() => {}} className="">
					<ActiveWizard />
					{!!nextWizard ?
						<button className="btn mt-10" onClick={() => handleNext()}>Next</button> :
						<button className={clsx("btn mt-10", {"loading": submitting})} onClick={() => handleSubmit()}>{submitting ? "loading" : "Submit"}</button>
					}
				</Form>
			</FormProvider>
		</MainLayout>
	)
}

// CreateProfile.auth = true;

export default CreateProfile
