package com.inkubiks.eventservice.adapters

import android.view.ViewGroup
import androidx.core.content.ContentProviderCompat.requireContext
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.inkubiks.eventservice.BindingViewHolder
import com.inkubiks.eventservice.R
import com.inkubiks.eventservice.databinding.ItemRecommendedEventBinding
import com.inkubiks.eventservice.databinding.ItemScheduleEventBinding
import com.inkubiks.eventservice.models.ScheduleEventModel
import com.inkubiks.eventservice.toBinding

class RecommendedEventsAdapter(
    private val listener: Listener
) : RecyclerView.Adapter<RecommendedEventsAdapter.EventViewHolder>() {

    private val eventsList: MutableList<ScheduleEventModel> = mutableListOf()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EventViewHolder =
        EventViewHolder(parent.toBinding())

    override fun onBindViewHolder(holder: EventViewHolder, position: Int) {
        holder.bind(eventsList[position])
    }

    override fun getItemCount(): Int = eventsList.size

    inner class EventViewHolder(binding: ItemRecommendedEventBinding) :
        BindingViewHolder<ItemRecommendedEventBinding>(binding) {

        init {
            binding.root.setOnClickListener { listener.onEventClicked(eventsList[layoutPosition].id) }
        }

        fun bind(event: ScheduleEventModel) = binding.apply {
            tvEventTitle.text = event.title
            tvEventDescription.text = event.description
            tvEventTime.text = event.time
            Glide.with(context).load(event.image).into(ivEventImage)
            Glide.with(context)
                .load(R.drawable.woman3)
                .circleCrop()
                .into(ivParticipant1)
            Glide.with(context)
                .load(R.drawable.man1)
                .circleCrop()
                .into(ivParticipant2)
            if (event.isImportant) {
                card.strokeWidth = 10
                card.strokeColor = ContextCompat.getColor(context, R.color.colorPrimary)
            }
        }
    }

    fun updateData(list: List<ScheduleEventModel>) {
        eventsList.clear()
        eventsList.addAll(list)
        notifyDataSetChanged()
    }

    interface Listener {
        fun onEventClicked(itemId: Int)
    }
}