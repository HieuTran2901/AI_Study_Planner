import { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { PreferenceService } from "@/services";

import type { UserPreferenceRequest } from "@/types/Request";

export function usePreference() {
  const [preferences, setPreferences] = useState<UserPreferenceRequest | null>(
    null,
  );

  const [error, setError] = useState<string | null>(null);

  // Separate loading states
  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
      if (err.code === "ERR_NETWORK") {
        return "Cannot connect to backend server.";
      }

      return err.response?.data?.message || err.message || "Request failed";
    }

    if (err instanceof Error) {
      return err.message;
    }

    return "Something went wrong";
  };

  // =========================
  // Fetch Preferences
  // =========================
  const fetchPreferences = useCallback(async () => {
    setIsFetching(true);
    setError(null);

    try {
      const data = await PreferenceService.getPreferences();

      setPreferences(data);

      return data;
    } catch (err: unknown) {
      const message = getErrorMessage(err);

      setError(message);

      toast.error(message, {
        toastId: "fetch-preferences-error",
      });

      throw err;
    } finally {
      setIsFetching(false);
    }
  }, []);

  // =========================
  // Update Preferences
  // =========================
  const updatePreferences = useCallback(async (data: UserPreferenceRequest) => {
    setIsSaving(true);
    setError(null);

    try {
      const updatedData = await PreferenceService.updatePreferences(data);

      setPreferences(updatedData);

      toast.success("Preferences saved successfully!");

      return updatedData;
    } catch (err: unknown) {
      const message = getErrorMessage(err);

      setError(message);

      toast.error(message);

      throw err;
    } finally {
      setIsSaving(false);
    }
  }, []);

  // =========================
  // Delete Preferences
  // =========================
  const deletePreferences = useCallback(async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await PreferenceService.deletePreferences();

      setPreferences(null);

      toast.success("Preferences deleted successfully!");
    } catch (err: unknown) {
      const message = getErrorMessage(err);

      setError(message);

      toast.error(message);

      throw err;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return {
    // data
    preferences,
    error,

    // loading states
    isFetching,
    isSaving,
    isDeleting,

    // actions
    fetchPreferences,
    updatePreferences,
    deletePreferences,
  };
}
