import { useState, useEffect } from "react";
import { getCategories } from "../services/apiService";
import type { CategoryDto, ExerciseFieldCreate, ExerciseCreateRequest } from "../types";

interface Props {
  initialData?: {
    name: string;
    notes: string;
    date: string;
    categoryIds: number[];
    fields: ExerciseFieldCreate[];
  };
  onSubmit: (data: ExerciseCreateRequest) => Promise<void>;
  submitLabel: string;
}

export function ExerciseForm({ initialData, onSubmit, submitLabel }: Props) {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [name, setName] = useState(initialData?.name ?? "");
  const [notes, setNotes] = useState(initialData?.notes ?? "");
  const [date, setDate] = useState(initialData?.date?.slice(0, 16) ?? "");
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    initialData?.categoryIds ?? []
  );
  const [fields, setFields] = useState<ExerciseFieldCreate[]>(
    initialData?.fields ?? []
  );
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setNotes(initialData.notes);
      setDate(initialData.date?.slice(0, 16) ?? "");
      setSelectedCategories(initialData.categoryIds);
      setFields(initialData.fields);
    }
  }, [initialData]);

  function toggleCategory(id: number) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function addField() {
    setFields([...fields, { name: "", value: "", unit: "" }]);
  }

  function removeField(index: number) {
    setFields(fields.filter((_, i) => i !== index));
  }

  function updateField(index: number, key: keyof ExerciseFieldCreate, val: string) {
    setFields(fields.map((f, i) => (i === index ? { ...f, [key]: val } : f)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await onSubmit({
        name,
        notes,
        date: date || new Date().toISOString(),
        categoryIds: selectedCategories,
        fields,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600">{error}</div>}

      <div>
        <label className="block font-semibold mb-1">Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Date *</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="block w-full p-2 border rounded"
          rows={3}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Categories</label>
        <div className="flex gap-3 flex-wrap">
          {categories.map((c) => (
            <label key={c.id} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={selectedCategories.includes(c.id)}
                onChange={() => toggleCategory(c.id)}
              />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-1">Fields</label>
        {fields.map((f, i) => (
          <div key={i} className="flex gap-2 mb-2 items-center">
            <input
              placeholder="Name (e.g. weight)"
              value={f.name}
              onChange={(e) => updateField(i, "name", e.target.value)}
              className="p-2 border rounded flex-1"
            />
            <input
              placeholder="Value (e.g. 100)"
              value={f.value}
              onChange={(e) => updateField(i, "value", e.target.value)}
              className="p-2 border rounded w-24"
            />
            <input
              placeholder="Unit (e.g. kg)"
              value={f.unit}
              onChange={(e) => updateField(i, "unit", e.target.value)}
              className="p-2 border rounded w-24"
            />
            <button
              type="button"
              onClick={() => removeField(i)}
              className="text-red-500 font-bold px-2"
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addField}
          className="text-blue-600 hover:underline text-sm"
        >
          + Add field
        </button>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
