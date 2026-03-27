import type { ExerciseFieldDto } from '../types';
export const ExerciseFieldList = ({fields}: {fields: ExerciseFieldDto[]}) => (
  <ul className="list-disc ml-5">
    {fields.map(f => (
      <li key={f.id}>{`${f.name}: ${f.value} ${f.unit}`}</li>
    ))}
  </ul>
);
