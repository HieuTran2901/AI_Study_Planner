import { useState, useEffect } from "react";
import { usePreference } from "@/hooks";
import { DEFAULT_PREFERENCES } from "@/types/Enums";
import type { UserPreferenceRequest } from "@/types/Request";

import {
  CurrentLevel,
  FavouriteSubject,
  LearningGoal,
  PreferredLanguage,
  PreferredResourceTypes,
  PreferredStudyTimes,
  StudyPlan,
  TargetTimeline,
  LearningStyle,
  ExistingSkills,
  CareerTarget,
  CertificationGoal,
  ExperienceYears,
} from "./components";

function LearningPreference() {
  const [formData, setFormData] = useState<UserPreferenceRequest | null>(null);

  const { preferences, fetchPreferences, isFetching } = usePreference();

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  const data = formData ?? preferences ?? DEFAULT_PREFERENCES;

  // ==================== Handlers ====================

  if (isFetching && !formData) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-slate-400">Loading preferences...</div>
      </div>
    );
  }
  return (
    <div className="space-y-6 pb-24">
      {/* ===== LEARNING ===== */}
      <FavouriteSubject data={data} setFormData={setFormData} />

      <ExistingSkills data={data} setFormData={setFormData} />

      <CurrentLevel data={data} setFormData={setFormData} />

      <ExperienceYears data={data} setFormData={setFormData} />

      {/* ===== GOALS ===== */}
      <LearningGoal data={data} setFormData={setFormData} />

      <CareerTarget data={data} setFormData={setFormData} />

      <CertificationGoal data={data} setFormData={setFormData} />

      <TargetTimeline data={data} setFormData={setFormData} />

      {/* ===== STUDY HABITS ===== */}
      <StudyPlan data={data} setFormData={setFormData} />

      <PreferredStudyTimes data={data} setFormData={setFormData} />

      {/* ===== CONTENT ===== */}
      <PreferredLanguage data={data} setFormData={setFormData} />

      <PreferredResourceTypes data={data} setFormData={setFormData} />

      {/* Save Preferences */}
      <LearningStyle data={data} setFormData={setFormData} />
    </div>
  );
}

export default LearningPreference;
