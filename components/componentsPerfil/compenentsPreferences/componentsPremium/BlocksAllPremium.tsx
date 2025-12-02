// src/components/compenentsPreferences/componentsPremium/BlocksAllPremium.tsx

import BlockPronouns from "./BlockPronouns";
import BlockZodiac from "./BlockZodiac";
import BlockPets from "./BlockPets";
import BlockSmoking from "./BlockSmoking";
import BlockDrinking from "./BlockDrinking";
import BlockActivity from "./BlockActivity";
import BlockCommunication from "./BlockCommunication";
import BlockEducation from "./BlockEducation";
import BlockLanguages from "./BlockLanguages";

import BlockInterestsActivities from "./BlockInterestsActivities";
import BlockInterestsLifestyle from "./BlockInterestsLifestyle";
import BlockInterestsCreativity from "./BlockInterestsCreativity";
import BlockInterestsSports from "./BlockInterestsSports";
import BlockInterestsMusic from "./BlockInterestsMusic";
import BlockInterestsNightlife from "./BlockInterestsNightlife";
import BlockInterestsTvCinema from "./BlockInterestsTvCinema";

interface Props {
  options: any;
  prefs: any;
  toggle: (field: string, value: string) => void;
}

export default function BlocksAllPremium({ options, prefs, toggle }: Props) {
  return (
    <>
      <BlockPronouns
        options={options.Pronoun}
        prefs={prefs.preferredPronouns}
        onToggle={(v: string) => toggle("preferredPronouns", v)}
      />

      <BlockZodiac
        options={options.ZodiacSign}
        prefs={prefs.preferredZodiacs}
        onToggle={(v: string) => toggle("preferredZodiacs", v)}
      />

      {/* 🔥 INTENTIONS REMOVIDO */}

      {/* 🔥 RELATIONSHIP TYPES REMOVIDO */}

      <BlockPets
        options={options.PetsPreference}
        prefs={prefs.preferredPets}
        onToggle={(v: string) => toggle("preferredPets", v)}
      />

      <BlockSmoking
        options={options.SmokingStatus}
        prefs={prefs.preferredSmoking}
        onToggle={(v: string) => toggle("preferredSmoking", v)}
      />

      <BlockDrinking
        options={options.DrinkingStatus}
        prefs={prefs.preferredDrinking}
        onToggle={(v: string) => toggle("preferredDrinking", v)}
      />

      <BlockActivity
        options={options.ActivityFrequency}
        prefs={prefs.preferredActivityLevel}
        onToggle={(v: string) => toggle("preferredActivityLevel", v)}
      />

      <BlockCommunication
        options={options.CommunicationStyle}
        prefs={prefs.preferredCommunication}
        onToggle={(v: string) => toggle("preferredCommunication", v)}
      />

      <BlockEducation
        options={options.EducationLevel}
        prefs={prefs.preferredEducationLevels}
        onToggle={(v: string) => toggle("preferredEducationLevels", v)}
      />

      <BlockLanguages
        options={options.Language}
        prefs={prefs.preferredLanguages}
        onToggle={(v: string) => toggle("preferredLanguages", v)}
      />

      {/* INTEREST BLOCKS */}
      <BlockInterestsActivities
        options={options.InterestActivity}
        prefs={prefs.preferredInterestsActivities}
        onToggle={(v: string) => toggle("preferredInterestsActivities", v)}
      />

      <BlockInterestsLifestyle
        options={options.InterestLifestyle}
        prefs={prefs.preferredInterestsLifestyle}
        onToggle={(v: string) => toggle("preferredInterestsLifestyle", v)}
      />

      <BlockInterestsCreativity
        options={options.InterestCreativity}
        prefs={prefs.preferredInterestsCreativity}
        onToggle={(v: string) => toggle("preferredInterestsCreativity", v)}
      />

      <BlockInterestsSports
        options={options.InterestSports}
        prefs={prefs.preferredInterestsSportsFitness}
        onToggle={(v: string) => toggle("preferredInterestsSportsFitness", v)}
      />

      <BlockInterestsMusic
        options={options.InterestMusic}
        prefs={prefs.preferredInterestsMusic}
        onToggle={(v: string) => toggle("preferredInterestsMusic", v)}
      />

      <BlockInterestsNightlife
        options={options.InterestNightlife}
        prefs={prefs.preferredInterestsNightlife}
        onToggle={(v: string) => toggle("preferredInterestsNightlife", v)}
      />

      <BlockInterestsTvCinema
        options={options.InterestTvCinema}
        prefs={prefs.preferredInterestsTvCinema}
        onToggle={(v: string) => toggle("preferredInterestsTvCinema", v)}
      />
    </>
  );
}
