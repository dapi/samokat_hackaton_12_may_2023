package com.inkubiks.eventservice.adapters

import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.inkubiks.eventservice.BindingViewHolder
import com.inkubiks.eventservice.R
import com.inkubiks.eventservice.databinding.ItemScheduleEventBinding
import com.inkubiks.eventservice.models.ScheduleEventModel
import com.inkubiks.eventservice.toBinding

class ScheduleEventsAdapter(
    private val listener: Listener
) : RecyclerView.Adapter<ScheduleEventsAdapter.EventViewHolder>() {

    private val eventsList: MutableList<ScheduleEventModel> = mutableListOf()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EventViewHolder =
        EventViewHolder(parent.toBinding())

    override fun onBindViewHolder(holder: EventViewHolder, position: Int) {
        holder.bind(eventsList[position])
    }

    override fun getItemCount(): Int = eventsList.size

    inner class EventViewHolder(binding: ItemScheduleEventBinding) :
        BindingViewHolder<ItemScheduleEventBinding>(binding) {

        init {
            binding.root.setOnClickListener { listener.onEventClicked(eventsList[layoutPosition].id) }
        }

        fun bind(event: ScheduleEventModel) = binding.apply {
            tvEventTitle.text = event.title

            if (event.isImportant) {
                eventCard.apply {
                    strokeWidth = 5
                    strokeColor = ContextCompat.getColor(context, R.color.colorPrimary)
                    ivEventImage.setColorFilter(
                        ContextCompat.getColor(context, R.color.colorPrimary30)
                    )
                }
            }
            Glide.with(context).load(event.image).into(ivEventImage)
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