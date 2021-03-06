/* eslint-disable camelcase */
import { Entity, PrimaryColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";
import Friend from './Friend';
import RecommendedTrack from './RecommendedTrack';
import HistoryGenre from './HistoryGenre';
import HistoryTrack from './HistoryTrack';
import HistoryArtist from './HistoryArtist';
import Notification from './Notification';


@Entity()
@ObjectType()
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  user_id: string;

  @Field(() => String)
  @Column()
  user_name: string;

  @Field(() => String)
  @Column()
  user_email: string;

  @Field(() => String)
  @Column()
  access_token: string;

  @Field(() => String)
  @Column()
  refresh_token: string;

  @Field(() => Boolean)
  @Column({nullable: true})
  logged_in: boolean;

  @Field(() => [Friend], {nullable: true})
  @OneToMany(() => Friend, (friend: Friend) => friend.user)
  friends!: Promise<Friend[]>;

  @Field(() => String)
  @Column({nullable: true})
  photo?: string;

  @Field(() => [RecommendedTrack], {nullable: true})
  @OneToMany(() => RecommendedTrack, (recommendedTrack: RecommendedTrack) => recommendedTrack.user)
  recommendedTracks!: Promise<RecommendedTrack[]>;

  @Field(() => [Notification], {nullable: true})
  @OneToMany(() => Notification, (notification: Notification) => notification.user)
  notifications!: Promise<Notification[] | undefined>;

  @Field(() => [HistoryGenre], {nullable: true})
  @OneToMany(() => HistoryGenre, (historyGenre: HistoryGenre) => historyGenre.user)
  historyGenres!: Promise<HistoryGenre[] | undefined>;

  @Field(() => [HistoryTrack], {nullable: true})
  @OneToMany(() => HistoryTrack, (historyTrack: HistoryTrack) => historyTrack.user)
  historyTracks!: Promise<HistoryTrack[] | undefined>;

  @Field(() => [HistoryArtist], {nullable: true})
  @OneToMany(() => HistoryArtist, (historyArtist: HistoryArtist) => historyArtist.user)
  historyArtists!: Promise<HistoryArtist[] | undefined>;
}
