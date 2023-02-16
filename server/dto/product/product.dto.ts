export class ProductDto {
  public id?: string;
  public type?: string;
  public brand?: string;
  public model?: string;
  public location?: string;
  public lostAt: string;

  constructor(
    lostAt: string,
    id?: string,
    type?: string,
    brand?: string,
    model?: string,
    location?: string
  ) {
    this.id = id || undefined;
    this.type = type || undefined;
    this.brand = brand || undefined;
    this.model = model || undefined;
    this.location = location || undefined;
    this.lostAt = lostAt;
  }
}
