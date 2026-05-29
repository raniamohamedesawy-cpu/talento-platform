package com.talento.repository;

import com.talento.entity.CreditTransaction;
import com.talento.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CreditTransactionRepository extends JpaRepository<CreditTransaction, Long> {
    List<CreditTransaction> findByUserOrderByCreatedAtDesc(User user);
}

