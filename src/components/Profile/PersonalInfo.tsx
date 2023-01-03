import clsx from "clsx";
import { Input } from "components/common/Input";

export const PersonalInfo = ({ className }: { className?: string }) => {

  return (
    <div className={clsx("", className)}>
      <div className="flex gap-4">
        <label htmlFor="firstName" className="flex flex-col gap-2 w-full mb-10">
          <span >*First name</span>
          <Input name="firstName" type="text" className="rounded-full" />
        </label>

        <label htmlFor="lastName" className="flex flex-col gap-2 w-full mb-10">
          <span >*Last name</span>
          <Input name="lastName" type="text" className="rounded-full" />
        </label>
      </div>

      <div className="mb-10 gap-2 flex flex-col items-center">
        <p>*Gender</p>
        <fieldset className="flex gap-5">
          <label className="flex gap-1 items-center">
            <Input name="gender" type="radio" value="male" />
            <span>male</span>
          </label>

          <label className="flex gap-1 items-center">
            <Input name="gender" type="radio" value="female" />
            <span>female</span>
          </label>

          <label className="flex gap-1 items-center">
            <Input name="gender" type="radio" value="other" />
            <span>other</span>
          </label>
        </fieldset>
      </div>

      <label htmlFor="age" className="flex flex-col gap-2 mb-10">
        <span>*Age</span>
        <Input name="age" type="number" min="16" className="rounded-full" />
      </label>
    </div>
  );
};
