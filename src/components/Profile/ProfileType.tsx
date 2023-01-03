import { Input } from "components/common/Input";

export function ProfileType() {
  return (
    <div className="mb-10 gap-2 flex flex-col items-center">
      <p>I am a ...</p>
      <fieldset className="flex gap-5">
        <label className="flex gap-1 items-center">
          <Input name="profileType" type="radio" value="caretaker" />
          <span>caretaker</span>
        </label>

        <label className="flex gap-1 items-center">
          <Input name="profileType" type="radio" value="caregiver" />
          <span>caregiver</span>
        </label>
      </fieldset>
    </div>
  );
}
