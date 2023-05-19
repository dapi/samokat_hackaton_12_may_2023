package com.inkubiks.eventservice.adapters

import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.inkubiks.eventservice.BindingViewHolder
import com.inkubiks.eventservice.databinding.ItemAvatarBinding
import com.inkubiks.eventservice.models.profile.Profile
import com.inkubiks.eventservice.models.profile.Status
import com.inkubiks.eventservice.toBinding

class ListAvatarUser(
    private val listener: Listener
) : RecyclerView.Adapter<ListAvatarUser.AvatarUserViewHolder>() {

    private val avatarUsers: MutableList<Profile> = mutableListOf()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AvatarUserViewHolder =
        AvatarUserViewHolder(parent.toBinding())

    override fun getItemCount(): Int = avatarUsers.size

    override fun onBindViewHolder(holder: AvatarUserViewHolder, position: Int) {
        holder.bind(avatarUsers[position])
    }

    fun setData(list: List<Profile>) {
        avatarUsers.clear()
        avatarUsers.addAll(list)
        notifyDataSetChanged()
    }

    inner class AvatarUserViewHolder(binding: ItemAvatarBinding) :
        BindingViewHolder<ItemAvatarBinding>(binding) {

            fun bind(profile: Profile) = binding.apply {
                Glide.with(context)
                    .load(profile.avatar)
                    .override(125, 125)
                    .circleCrop()
                    .into(ivAvatarMedium)
                if (profile.isTeamLead) {
                    ivKing.visibility = View.VISIBLE
                }
                if (profile.status == Status.ONLINE.value) {
                    ivOnline.visibility = View.VISIBLE
                }
                root.setOnClickListener {
                    listener.clickUser(profile)
                }
            }
    }

    interface Listener {
        fun clickUser(profile: Profile)
    }
}
