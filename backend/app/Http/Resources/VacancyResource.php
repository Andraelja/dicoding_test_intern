<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VacancyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'job_type' => $this->job_type,
            'quota' => $this->quota,
            'active_until' => $this->active_until?->format('d M Y'),
            'location' => $this->location,
            'is_remote' => $this->is_remote,
            'description' => $this->description,
            'position' => [
                'id' => $this->position->id,
                'name' => $this->position->name,
            ],
            'min_salary' => $this->min_salary,
            'max_salary' => $this->max_salary,
            'is_show_salary' => $this->is_show_salary,
            'min_experience' => $this->min_experience,
            'created_at' => $this->created_at?->format('d M Y H:i'),
            'updated_at' => $this->updated_at?->diffForHumans(),
        ];
    }
}
