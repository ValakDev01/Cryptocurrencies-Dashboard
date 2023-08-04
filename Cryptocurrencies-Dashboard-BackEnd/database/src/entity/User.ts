import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class CoinInfo {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    name!: string

  @Column()
    symbol!: string

  @Column()
    isHidden!: boolean
}
