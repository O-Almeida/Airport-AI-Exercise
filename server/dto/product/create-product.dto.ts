export interface CreateProductDto {
  type: string;
  brand: string;
  model?: string;
  location?: string;
  lostAt: string;
}
