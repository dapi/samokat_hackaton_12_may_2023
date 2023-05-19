package com.inkubiks.eventservice.presentation

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContentProviderCompat.requireContext
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.bumptech.glide.Glide
import com.google.android.material.snackbar.Snackbar
import com.inkubiks.eventservice.EventType
import com.inkubiks.eventservice.R
import com.inkubiks.eventservice.databinding.FragmentEventBinding
import com.inkubiks.eventservice.item_event_key
import com.inkubiks.eventservice.item_event_type
import com.inkubiks.eventservice.models.ScheduleEventModel
import com.inkubiks.eventservice.models.recommendedEventsAndNews
import com.inkubiks.eventservice.models.scheduledEvents


class EventFragment : Fragment() {

    private var binding: FragmentEventBinding? = null
    private var event: ScheduleEventModel? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val eventId = arguments?.getInt(item_event_key)
        val eventType = arguments?.getInt(item_event_type)
        event = when (eventType) {
            EventType.SCHEDULED.ordinal -> scheduledEvents.first { it.id == eventId }
            EventType.RECOMMENDED.ordinal -> recommendedEventsAndNews.first { it.id == eventId }
            else -> return
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentEventBinding.inflate(inflater, container, false)
        return binding?.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setupUI()
    }

    private fun setupUI() {
        binding?.apply {
            topAppBar.setNavigationOnClickListener { findNavController().navigateUp() }
            topAppBar.title = event?.title

            Glide.with(requireContext())
                .load(event?.image)
                .into(ivEventImage)

            tvEventTitle.text = event?.title
            tvEventDescription.text = event?.description
            tvEventPlace.text = event?.place

            Glide.with(requireContext())
                .load(R.drawable.woman2)
                .circleCrop()
                .into(ivParticipant1)
            Glide.with(requireContext())
                .load(R.drawable.man3)
                .circleCrop()
                .into(ivParticipant2)

            btnAcceptEvent.setOnClickListener {
                Snackbar.make(it, "Вы идете на мероприятие", Snackbar.LENGTH_LONG)
                    .setAnchorView(btnAcceptEvent)
                    .setAction("Позвать друзей") {}
                    .show()
            }
            btnDeclineEvent.setOnClickListener {
                Snackbar.make(it, "Мероприятие отклонено", Snackbar.LENGTH_LONG).show()
                btnAcceptEvent.visibility = View.INVISIBLE
                btnDeclineEvent.visibility = View.INVISIBLE
            }

            if (event?.isNews == true) {
                btnAcceptEvent.visibility = View.INVISIBLE
                btnDeclineEvent.visibility = View.INVISIBLE
            }
            if (event?.isImportant == true) {
                root.setBackgroundColor(
                    ContextCompat.getColor(requireContext(), R.color.colorPrimary)
                )
            }
        }
    }

    private fun setupObservers() {}
}