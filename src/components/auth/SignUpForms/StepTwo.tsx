import React, { useEffect } from "react";
import Input from "../../common/Inputs.tsx";
import { africanCountryOptions, ghanaRegionOptions } from "../../../utils/Options.ts";
import SearchableSelect from "../../common/Select.tsx";
import PhoneInput from "../../common/PhoneInput.tsx";

interface FormData {
  address_1: string;
  address_2?: string;
  region: string;
  country: string;
  phone: string;
  prefix?: string;
}

interface StepTwoProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  setIsStepValid: (valid: boolean) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ formData, setFormData, setIsStepValid }) => {
  useEffect(() => {
    const isValid =
      formData.address_1.trim() !== "" &&
      formData.region.trim() !== "" &&
      formData.country.trim() !== "" &&
      formData.phone.trim() !== "";

    setIsStepValid(isValid);
  }, [formData, setIsStepValid]);

  return (
    <div className="space-y-4">
      <Input
        label="Address 1"
        name="address_1"
        placeholder="Enter your first address"
        value={formData.address_1}
        onChange={(e) =>
          setFormData({ ...formData, address_1: e.target.value })
        }
        required
      />

      <Input
        label="Address 2 (Optional)"
        name="address_2"
        placeholder="Enter your second address"
        value={formData.address_2 || ""}
        onChange={(e) =>
          setFormData({ ...formData, address_2: e.target.value })
        }
      />

      <SearchableSelect
        label="Region"
        name="region"
        options={ghanaRegionOptions}
        value={formData.region}
        onChange={(value) =>
          setFormData({ ...formData, region: value })
        }
        required
      />

      <SearchableSelect
        label="Country"
        name="country"
        options={africanCountryOptions}
        value={formData.country}
        onChange={(value) =>
          setFormData({ ...formData, country: value })
        }
        required
      />

      <PhoneInput
        prefix="+233"
        phone={formData.phone}
        onPrefixChange={(prefix) =>
          setFormData({ ...formData, prefix })
        }
        onPhoneChange={(e) =>
          setFormData({ ...formData, phone: e.target.value })
        }
        required
      />
    </div>
  );
};

export default StepTwo;
