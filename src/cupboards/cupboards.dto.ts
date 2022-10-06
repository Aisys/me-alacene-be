export class BaseDto {
    title: string
    description?: string
}

export class CreateDto extends BaseDto {}

export class UpdateDto extends BaseDto {
  completedAt: Date;
}
