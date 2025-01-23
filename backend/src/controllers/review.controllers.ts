import type { Review } from "@/types/review";
import { Request, Response } from "express";
import ReviewModel from "@/models/review.model";

// 리뷰 생성 - Create
export const createReview = async (
  req: Request<{}, {}, Review>,
  res: Response
): Promise<void> => {
  const { isbn, userId, content, rating } = req.body;

  try {
    const newReview = new ReviewModel({
      isbn,
      userId,
      content,
      rating,
    });

    await newReview.save();

    res.status(201).json({ message: "리뷰가 정상적으로 등록되었습니다." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "리뷰 등록 중 오류가 발생했습니다.", error });
  }
};

// ISBN으로 리뷰 불러오기 - Read
export const getReviewsByIsbn = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { isbn } = req.params;
  try {
    const reviews = await ReviewModel.find({ isbn });

    if (reviews.length === 0 || !reviews) {
      res.status(404).json({ message: "해당 도서의 리뷰를 찾을 수 없습니다." });
      return;
    }
    res.status(200).json({
      message: "리뷰 조회에 성공했습니다.",
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: "리뷰 조회 중 오류가 발생했습니다.",
    });
  }
};

//TODO: 리뷰 수정, 삭제 기능 구현 필요(회원 도메인 구현 이후)
