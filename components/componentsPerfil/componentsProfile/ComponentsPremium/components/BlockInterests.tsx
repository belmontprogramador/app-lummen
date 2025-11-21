// src/components/userProfile/BlockInterests.tsx
import { View } from "react-native";
import PreferenceBlock from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceBlock";
import PreferenceChip from "@/components/componentsPerfil/componentsProfile/ComponentsPremium/components/PreferenceChip";

export default function BlockInterests({ enums = {}, form = {}, onToggle = () => {} }: any) {
  return (
    <View>
      <PreferenceBlock title="Activities">
        {(enums.InterestActivity || []).map((o: any) => (
          <PreferenceChip key={o.value} label={o.label}
            active={(form.preferredInterestsActivities || []).includes(o.value)}
            onPress={() => onToggle("preferredInterestsActivities", o.value)} />
        ))}
      </PreferenceBlock>

      <PreferenceBlock title="Lifestyle">
        {(enums.InterestLifestyle || []).map((o: any) => (
          <PreferenceChip key={o.value} label={o.label}
            active={(form.preferredInterestsLifestyle || []).includes(o.value)}
            onPress={() => onToggle("preferredInterestsLifestyle", o.value)} />
        ))}
      </PreferenceBlock>

      <PreferenceBlock title="Creativity">
        {(enums.InterestCreativity || []).map((o: any) => (
          <PreferenceChip key={o.value} label={o.label}
            active={(form.preferredInterestsCreativity || []).includes(o.value)}
            onPress={() => onToggle("preferredInterestsCreativity", o.value)} />
        ))}
      </PreferenceBlock>

      <PreferenceBlock title="Sports & Fitness">
        {(enums.InterestSports || []).map((o: any) => (
          <PreferenceChip key={o.value} label={o.label}
            active={(form.preferredInterestsSportsFitness || []).includes(o.value)}
            onPress={() => onToggle("preferredInterestsSportsFitness", o.value)} />
        ))}
      </PreferenceBlock>

      <PreferenceBlock title="Music">
        {(enums.InterestMusic || []).map((o: any) => (
          <PreferenceChip key={o.value} label={o.label}
            active={(form.preferredInterestsMusic || []).includes(o.value)}
            onPress={() => onToggle("preferredInterestsMusic", o.value)} />
        ))}
      </PreferenceBlock>

      <PreferenceBlock title="Nightlife">
        {(enums.InterestNightlife || []).map((o: any) => (
          <PreferenceChip key={o.value} label={o.label}
            active={(form.preferredInterestsNightlife || []).includes(o.value)}
            onPress={() => onToggle("preferredInterestsNightlife", o.value)} />
        ))}
      </PreferenceBlock>

      <PreferenceBlock title="TV & Cinema">
        {(enums.InterestTvCinema || []).map((o: any) => (
          <PreferenceChip key={o.value} label={o.label}
            active={(form.preferredInterestsTvCinema || []).includes(o.value)}
            onPress={() => onToggle("preferredInterestsTvCinema", o.value)} />
        ))}
      </PreferenceBlock>
    </View>
  );
}
