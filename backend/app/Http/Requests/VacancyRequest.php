<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VacancyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'position_id' => 'required|exists:positions,id',
            'job_type' => 'required|in:full-time,part-time,contract,intern',
            'quota' => 'required|integer|min:1',
            'active_until' => 'required|date|after_or_equal:today',
            'location' => 'required|string',
            'is_remote' => 'boolean',
            'description' => 'required|string',
        ];
    }
}
